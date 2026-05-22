import SkeletonBox from "../common/SkeletonBox";


export default function OrderDetailSkeleton() {
    return (
        <div className='space-y-6'>
            <SkeletonBox className='h-8 w-48' />

            <SkeletonBox className='h-32 rounded-2xl' />

            <SkeletonBox className='h-64 rounded-2xl' />
        </div>
    );
}